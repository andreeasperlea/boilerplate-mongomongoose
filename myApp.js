require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ MongoDB connected!");
}).catch(err => {
  console.error("❌ Connection error:", err);
});


const personSchema=new Schema({
  name: { type: String, required: true },
  age:Number,
  favoriteFoods:[String]
})

let Person=mongoose.model('Person', personSchema);

exports.PersonModel = Person;

const arrayOfPeople=[{
  name:"john",
  age:56,
  favoriteFoods:["sushi","sweets"]}
  ,{
    name:"Mike",
    age:45,
    favoriteFoods:["pizza","pasta"]
  }];
const createAndSavePerson = (done) => {
  const person=new Person({
    name:"Mike",
    age:45,
    favoriteFoods:["pizza","pasta"]
  })

  person.save((err,data)=>{
    if(err) return done(err);
    return done(null,data);
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,(err,data)=>{
    if(err) return done(err);
    return done(null,data);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName},(err,data)=>{
    if(err) return done(err);
    return done(null,data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food},(err,data)=>{
    if(err) return done(err);
    return done(null,data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return done(err);
    return done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    if (!person) return done(new Error("Person not found"));

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if (err) return done(err);
      return done(null, updatedPerson);
    });
  });
};


const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
 Person.findOneAndUpdate({name:personName},{age:ageToSet},{new:true},(err,updatedPerson)=>{
  if(err) return done(err);
  if(!updatedPerson) return done(new Error("Person not found"));
  return done(null,updatedPerson);
 });
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
