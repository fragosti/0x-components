const log = process.env.NODE_ENV === "development" ? console.log : () => {};

export default log;
