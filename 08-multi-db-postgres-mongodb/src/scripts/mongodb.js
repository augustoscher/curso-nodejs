
// docker exec -it mongodb \
//   mongo -u admin -p senhaadmin --authenticationDatabase admin

//mostrar databases
//show dbs

//configurando o contexto para heros db
//use heroes

//mostrar collections
//show collections

//find
db.heroes.find({}).limit(1000).sort({"_id": 1 })
db.heroes.find({}, {"_id": 0}).limit(1000).sort({"_id": 1 })

//insert
db.heroes.insert({name: 'Flash', power: 'Speed', birthDate: new Date()})

for (let i = 0; i<100000; i++){
    db.heroes.insert({name: `Clone${i+1}`, power: 'Speed', birthDate: new Date()})
}

//update
db.heroes.update({name: 'Clone100'}, {name: 'Batman', power: 'Money'})

//Update just one value
db.heroes.update({name: 'Clone101'}, { $set: { name: 'Captain America'}})

//delete

