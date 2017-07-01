export function fetchPopularRepos() {
  return Promise.resolve([
    { id: "jaj", name: "leo" },
    { id: "sd", name: "nik" },
    {
      id: "ssd",
      name: "andy"
    }
  ]);
}

export function getProfile(any) {
  return Promise.resolve({
    data: { name: "liu" }
  });
}
