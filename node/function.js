const users = [
  { name: "Alice", age: 22, hobbies: ["reading", "coding", "hiking"] },
  { name: "Bob", age: 16, hobbies: ["gaming", "coding"] },
  { name: "Charlie", age: 19, hobbies: ["drawing", "cooking"] },
  { name: "Diana", age: 25, hobbies: ["coding", "chess", "music"] },
];

const res = users
  .filter((user, index) => {
    return user.age > 18 && user.hobbies.includes("coding");
  })
  .map((el, index) => {
    return {
      name: el.name,
      hobbyCount: el.hobbies.length,
    };
  });

console.log(res);
