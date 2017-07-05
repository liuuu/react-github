export function fetchPopularRepos() {
  return Promise.resolve([
    { id: "first", name: "leo" },
    { id: "second", name: "nik" },
    {id: "third",name: "andy"}
  ]);
}

export function getProfile(name) {
  return Promise.resolve({
    data: { name: "liu" }
  });
}
