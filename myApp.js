require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true }).then(() => console.log("MongoDB connected successfully")).catch(err => console.error("MongoDB connection error:", err));

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, /*unique: true,*/ trim: true },
  age: { type: Number, min: 0, max: 100 },
  favoriteFoods: { type: [String], default: [] },
});
let Person = mongoose.model("Person", personSchema);
/*Person.remove = Person.deleteMany;*/

const createAndSavePerson = (done) => {
  let natejones = new Person({
    name: "Nate Jones",
    age: 25,
    favoriteFoods: ["pizza", "lesagna"]
  });
  natejones.save((err, data) => {
    if (err) return console.error(err);
    done(null , data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return done(err);
    done(null , data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) return done(err);

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    })
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, {age: ageToSet}, { new: true }, (err, updatedPerson) => {
    if(err) return done(err);
    done(null, updatedPerson);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, deletedPerson) => {
    if(err) return done(err);
    done(null, deletedPerson);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, data) => {
    done(err, data);
  })
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
