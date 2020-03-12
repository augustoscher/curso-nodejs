const assert = require("assert");
const Mongo = require("../db/strategies/mongodb");
const Context = require("../db/strategies/base/contextStrategy");

const context = new Context(new Mongo());
const MOCKED_HERO = { name: 'Iron Man', power: 'Money' };
const MOCKED_HERO_UPD = { name: 'Batman', power: 'Money' };