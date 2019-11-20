/* eslint-disable no-console */
const { connectToDatabase, disconnectDatabase } = require("../src/config/db");
const Customer = require("../src/models/Customer.model");

const randomNif = () => {
  const numbers = "0123456789".split("");
  const letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
  let final = "";
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 8; i++) {
    final += numbers[Math.floor(Math.random() * numbers.length)];
  }
  final += letters[Math.floor(Math.random() * letters.length)];
  return final;
};

// eslint-disable-next-line prettier/prettier
const names = ["Adrián", "Juan", "Pedro", "Guillermo", "Paula", "Cristina", "David", "Ana", "Silvia", "Tamara", "Julián", "Francisco", "Javier", "Isabel", "Raúl", "Jesús", "Alberto", "María", "José", "Pablo"];
// eslint-disable-next-line prettier/prettier
const surnames = ["Gonzalo", "García", "Rodríguez", "Cabrera", "Díaz", "López", "Encinas", "Montejo", "Plasencia", "Rodrigo", "Sánchez", "Contreras", "Casado", "Iglesias"];

const randomItem = set => set[Math.floor(Math.random() * set.length)];

const generateRandom = l => set => (initial = "") =>
  [...Array(l)].reduce(final => `${final}${randomItem(set)}`, initial);

// eslint-disable-next-line prettier/prettier
const birthdates = ["1988-11-07", "1989-10-22", "1993-01-03", "1987-10-04", "2001-01-01", "1995-05-15", "1994-12-16"];

const generateRandomData = () => {
  const firstname = randomItem(names);
  const lastname = randomItem(surnames);
  const domain = randomItem(["gmail", "hotmail", "sazed"]);
  const extension = randomItem(["es", "com", "net"]);
  const diff = generateRandom(8)(["a", "b", "c", 0, 1])();
  const email = `${firstname}.${lastname}.${diff}@${domain}.${extension}`;

  return {
    nif: randomNif(),
    firstname,
    lastname,
    email,
    phone: Number(generateRandom(8)([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])(6)),
    birthdate: randomItem(birthdates),
    LGPD: randomItem([true, false]),
    notes: randomItem(["", "blabla blá", "bleble blé"])
  };
};

const main = async () => {
  await connectToDatabase();
  await Customer.deleteMany({});
  await Promise.all(
    [...Array(777)].map(() => {
      const instance = new Customer(generateRandomData());
      return instance.save();
    })
  );
  await disconnectDatabase();
  console.log("finished!");
};

main().catch(err => {
  console.error(err);
  process.exit(1);
});
