# 关于test
----
当要添加App的test时, 才了解之前写的组件耦合性是多么强, 多么难做unit test
才了解Dan amrabov关于Container[文章](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)对于test的意义

在这个分支你会看解耦到分为`container`和`components`文件夹, 而`master`里面的混乱.

主要是用了Jest做的snapshot测试, 用airbnb的`enzyme`的shallow做的组件测试

##关于Container的lifecycle测试
----
```js
 componentDidMount() {
    const localData = localStorage.getItem("AllUserData");
    if (!localData) {
      Api.fetchPopularRepos().then(data => {
        ...
      });
    } else {
      this.setState({
        ...
      });
    }
  }
```

测试AllUserContainer时候,在`ComponentDidMount`里面需要异步去获取数据, 
根据enzyme的api`mount`和`shallow` 
[shallow default life cycle hooks](https://github.com/airbnb/enzyme/issues/465),只有`mount`的时候才会激活`ComponentDidMount`,

然而, 子组件需要需要react route这个组件`<Link>`,这个组件mounting的时候需要`context`, ract-router 推荐使用<MemoryRouter>包裹这个组件[Github react-router/testing.md](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/testing.md)
如:
`mount(<MemoryRouter><Component /><MemoryRouter>)`
测试里面有个目的是想测试这个组件mount之后, 异步返回数据后会修改的state状态,
而enzyme的`state('property')` 只能在root组件有用, 显然这个经过包裹之后已经获取不到state的属性了, 解决方法见下.

lifecycleExperimental flag
可以用shallow 提供的子组件的lifecycle method
  In the next major version, it'll be enabled by default.
  [lifecycleExperimental flag](https://github.com/airbnb/enzyme/pull/318)
这样就可以用shallow(<Component>, {lifecycleExprimental: true})来测试这个组件, 而且省下了mount需要mount整个DOM Tree的cost.


### localStorage 的mock
测试环境中是没有browser默认的api的, 所以需要mock localStorage.
模仿了matchmedia(刚开始测试的时候, 终端就报错找不到matchmedia) 的测试方法[mock media](https://stackoverflow.com/questions/41366380/matchmedia-not-present-when-testing-create-react-app-component-which-contain-rea)
在setupTests.js中
```js
global.localStorage = (function() {
  var store = {};
  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    }
  };
})();
```

### 异步的mock
在`componentDidMount`中有个异步请求的过程,
- [jest manual mock](http://facebook.github.io/jest/docs/en/manual-mocks.html#docsNav)
unit测试最好不去测试网络请求的数据.
- 模仿Jest[Jest Async example](http://facebook.github.io/jest/docs/en/tutorial-async.html#content)
如: 
```js
  it("state.isLoading should be false when componentDidMount invoked ", () => {
    const wrapper = shallow(<AllUserContainer />, { lifecycleExperimental: true });
    const setItem = spyOn(localStorage, "setItem");
    return Api.fetchPopularRepos().then(() => {
      expect(wrapper.state("isLoading")).toEqual(false);
      expect(wrapper.find(Row)).toHaveLength(1);
      expect(wrapper.find(UserCard)).toHaveLength(3);
      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });
```