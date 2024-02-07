// const express = require('express')
// const mongoose = require('mongoose')
// const cors = require('cors')
// const UserModel =require('./models/user')
// const PlantsModel =require('./models/all_plants')

// const app = express()
// app.use(cors())
// app.use(express.json())


// // exports.app = functions.https.onRequest(app);
// // mongoose.connect("mongodb://localhost:27017/db")

// //  app.get('/Aboutus', (req, res) => {
// //      UserModel.find()
// //      .then(student => res.json(student))
// //      .catch(err => res.json(err))
// //      console.log("server is runninsdsag")
// // //     const student={
// //     }
// // res.json(student);

// // })
// // Display all plants


//  const { MongoClient } = require('mongodb');

// // async function fetchData() {
   
// //   const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB URI
// //   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//   // try {
//   //   await client.connect();

//   //   const database = client.db('herbel_cartel'); // Replace with your database name
//   //   const collection = database.collection('Plants_name'); // Replace with your collection name

//   //   // Fetch data from the collection
//   //   const query = {}; // You can add query conditions if needed
//   //   const result = await collection.find(query).toArray();

//   //   // Plants => res.json(result)
//   //   console.log('Fetched data:', result);
//   //   return result;
//   // } catch (err) {
//   //   console.error('Error fetching data:', err);
//   // } finally {
//   //   await client.close();
//   // }
// //   try {
// //     await client.connect();

// //     const database = client.db('herbel_cartel');
// //     const plantsCollection = database.collection('Plants');
// //     const plantsNameCollection = database.collection('Plants_name');

// //     const result = await plantsNameCollection.aggregate([
// //       {
// //         $lookup: {
// //           from: 'Plants',
// //           localField: 'plant_id',
// //           foreignField: 'plant_id',
// //           as: 'plantInfo'
// //         }
// //       },
// //       {
// //         $unwind: '$plantInfo'
// //       },
// //       {
// //         $lookup: {
// //           from: 'plants_properties',
// //           localField: 'plant_id',
// //           foreignField: 'plant_id',
// //           as: 'plantDetInfo'
// //         }
// //       },
// //       {
// //         $unwind: '$plantDetInfo'
// //       },
// //       {
// //         $lookup: {
// //           from: 'Images',
// //           localField: 'plant_id',
// //           foreignField: 'plant_id',
// //           as: 'image'
// //         }
// //       },
// //       {
// //         $unwind: '$image'
// //       }
// //     ]).toArray();

// //     console.log('Fetched data:', result);
// //     return result;
// //   } catch (err) {
// //     console.error('Error fetching data:', err);
// //   } finally {
// //     await client.close();
// //   }
  
// // }
// async function fetchData(searchTerm = "") {
//   const uri = 'mongodb+srv://ritheshp11:admin@herbcartel.bilcy0r.mongodb.net/?retryWrites=true&w=majority7'; // Replace with your MongoDB URI
//   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
//   try {
//     await client.connect();

//     const database = client.db('herbel_cartel');
//     const plantsCollection = database.collection('Plants');
//     const plantsNameCollection = database.collection('Plants_name');
//     let pipeline =[];
//     if (searchTerm) {
//       pipeline = [
//         {
//           $lookup: {
//             from: 'Plants',
//             localField: 'plant_id',
//             foreignField: 'plant_id',
//             as: 'plantInfo'
//           }
          
//         },
//         {
//           $unwind: '$plantInfo'
//         },
//         {
//           $lookup: {
//             from: 'plants_properties',
//             localField: 'plant_id',
//             foreignField: 'plant_id',
//             as: 'plantDetInfo'
//           }
//         },
//         {
//           $unwind: '$plantDetInfo'
//         },
//         {
//           $lookup: {
//             from: 'Images',
//             localField: 'plant_id',
//             foreignField: 'plant_id',
//             as: 'image'
//           }
//         },
//         {
//           $unwind: '$image'
//         },
//         {
//           $match: {
//             $or: [
//               {
//                 'plantInfo.scientific_name': {
//                   $regex: new RegExp(searchTerm, 'i')
//                 }
//               },
//               {
//                 'plantInfo.introduction': {
//                   $regex: new RegExp(searchTerm, 'i')
//                 }
//               },
//               {
//                 'english': {
//                   $regex: new RegExp(searchTerm, 'i')
//                 }
//               },
//               {
//                 'plantInfo.category': {
//                   $regex: new RegExp(searchTerm, 'i')
//                 }
//               },
//               {
//                 'plantDetInfo.uses': {
//                   $regex: new RegExp(searchTerm, 'i')
//                 }
//               },
//               {
//                 'plantDetInfo.additional_info': {
//                   $regex: new RegExp(searchTerm, 'i')
//                 }
//               },
//               {
//                 'plantDetInfo.demerits': {
//                   $regex: new RegExp(searchTerm, 'i')
//                 }
//               },
//               // Add more conditions using $or as needed
//             ]
//           }
//         }
//         ];
//     }
//     else{
//     pipeline = [
//       {
//         $lookup: {
//           from: 'Plants',
//           localField: 'plant_id',
//           foreignField: 'plant_id',
//           as: 'plantInfo'
//         }
        
//       },
//       {
//         $unwind: '$plantInfo'
//       },
//       {
//         $lookup: {
//           from: 'plants_properties',
//           localField: 'plant_id',
//           foreignField: 'plant_id',
//           as: 'plantDetInfo'
//         }
//       },
//       {
//         $unwind: '$plantDetInfo'
//       },
//       {
//         $lookup: {
//           from: 'Images',
//           localField: 'plant_id',
//           foreignField: 'plant_id',
//           as: 'image'
//         }
//       },
//       {
//         $unwind: '$image'
//       }
      
//     ];
//   }
//     const result = await plantsNameCollection.aggregate(pipeline).toArray();
//     console.log('Fetched data:', result);
//     console.log('Pipeline:', pipeline);
//     return result;
//   } catch (err) {
//     console.error('Error fetching data:', err);
//   } finally {
//     await client.close();
//   }
// }
// async function fetchData1(searchTerm = "") {
//   const uri = 'mongodb+srv://ritheshp11:admin@herbcartel.bilcy0r.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB URI
//   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
//   try {
//     await client.connect();

//     const database = client.db('herbel_cartel');
//     const plantsCollection = database.collection('Plants');
//     const plantsNameCollection = database.collection('Plants_name');
//     let pipeline =[];
//     if (searchTerm) {
//       pipeline = [
//         {
//           $lookup: {
//             from: 'Plants',
//             localField: 'plant_id',
//             foreignField: 'plant_id',
//             as: 'plantInfo'
//           }
          
//         },
//         {
//           $unwind: '$plantInfo'
//         },
//         {
//           $lookup: {
//             from: 'plants_properties',
//             localField: 'plant_id',
//             foreignField: 'plant_id',
//             as: 'plantDetInfo'
//           }
//         },
//         {
//           $unwind: '$plantDetInfo'
//         },
//         {
//           $lookup: {
//             from: 'Images',
//             localField: 'plant_id',
//             foreignField: 'plant_id',
//             as: 'image'
//           }
//         },
//         {
//           $unwind: '$image'
//         },
//         {
//           $match: {
//             $and: [
//               {
//                 $or: [
//                   {
//                     'plantInfo.scientific_name': {
//                       $regex: new RegExp(searchTerm, 'i')
//                     }
//                   },
//                   {
//                     'plantInfo.introduction': {
//                       $regex: new RegExp(searchTerm, 'i')
//                     }
//                   },
//                   {
//                     'english': {
//                       $regex: new RegExp(searchTerm, 'i')
//                     }
//                   },
//                   {
//                     'plantDetInfo.uses': {
//                       $regex: new RegExp(searchTerm, 'i')
//                     }
//                   },
//                   {
//                     'plantDetInfo.additional_info': {
//                       $regex: new RegExp(searchTerm, 'i')
//                     }
//                   },
//                   {
//                     'plantDetInfo.demerits': {
//                       $regex: new RegExp(searchTerm, 'i')
//                     }
//                   },
//                   // Add more conditions using $or as needed
//                 ]
//               },
//               {
//                 'plantInfo.category': 'herb'
//               }
//             ]
//           }
//         }
        
//         ];
//     }
//     else{
//     pipeline = [
//       {
//         $lookup: {
//           from: 'Plants',
//           localField: 'plant_id',
//           foreignField: 'plant_id',
//           as: 'plantInfo'
//         }
        
//       },
//       {
//         $unwind: '$plantInfo'
//       },
//       {
//         $lookup: {
//           from: 'plants_properties',
//           localField: 'plant_id',
//           foreignField: 'plant_id',
//           as: 'plantDetInfo'
//         }
//       },
//       {
//         $unwind: '$plantDetInfo'
//       },
//       {
//         $lookup: {
//           from: 'Images',
//           localField: 'plant_id',
//           foreignField: 'plant_id',
//           as: 'image'
//         }
//       },
//       {
//         $unwind: '$image'
//       },
//       {
//         $match: {
//           'plantInfo.category': 'herb'
//         }
//       }
      
//     ];
//   }
//     const result = await plantsNameCollection.aggregate(pipeline).toArray();
//     console.log('Fetched data:', result);
//     console.log('Pipeline:', pipeline);
//     return result;
//   } catch (err) {
//     console.error('Error fetching data:', err);
//   } finally {
//     await client.close();
//   }
// }
// async function fetchData2(searchTerm = "") {
//   const uri = 'mongodb+srv://ritheshp11:admin@herbcartel.bilcy0r.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB URI
//   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
//   try {
//     await client.connect();

//     const database = client.db('herbel_cartel');
//     const plantsCollection = database.collection('Plants');
//     const plantsNameCollection = database.collection('Plants_name');
//     let pipeline =[];
//     if (searchTerm) {
//       pipeline = [
//         {
//           $lookup: {
//             from: 'Plants',
//             localField: 'plant_id',
//             foreignField: 'plant_id',
//             as: 'plantInfo'
//           }
          
//         },
//         {
//           $unwind: '$plantInfo'
//         },
//         {
//           $lookup: {
//             from: 'plants_properties',
//             localField: 'plant_id',
//             foreignField: 'plant_id',
//             as: 'plantDetInfo'
//           }
//         },
//         {
//           $unwind: '$plantDetInfo'
//         },
//         {
//           $lookup: {
//             from: 'Images',
//             localField: 'plant_id',
//             foreignField: 'plant_id',
//             as: 'image'
//           }
//         },
//         {
//           $unwind: '$image'
//         },
//         {
//           $match: {
//             $and: [
//               {
//                 $or: [
//                   {
//                     'plantInfo.scientific_name': {
//                       $regex: new RegExp(searchTerm, 'i')
//                     }
//                   },
//                   {
//                     'plantInfo.introduction': {
//                       $regex: new RegExp(searchTerm, 'i')
//                     }
//                   },
//                   {
//                     'english': {
//                       $regex: new RegExp(searchTerm, 'i')
//                     }
//                   },
//                   {
//                     'plantDetInfo.uses': {
//                       $regex: new RegExp(searchTerm, 'i')
//                     }
//                   },
//                   {
//                     'plantDetInfo.additional_info': {
//                       $regex: new RegExp(searchTerm, 'i')
//                     }
//                   },
//                   {
//                     'plantDetInfo.demerits': {
//                       $regex: new RegExp(searchTerm, 'i')
//                     }
//                   },
//                   // Add more conditions using $or as needed
//                 ]
//               },
//               {
//                 'plantInfo.category': 'shrub'
//               }
//             ]
//           }
//         }
        
//         ];
//     }
//     else{
//     pipeline = [
//       {
//         $lookup: {
//           from: 'Plants',
//           localField: 'plant_id',
//           foreignField: 'plant_id',
//           as: 'plantInfo'
//         }
        
//       },
//       {
//         $unwind: '$plantInfo'
//       },
//       {
//         $lookup: {
//           from: 'plants_properties',
//           localField: 'plant_id',
//           foreignField: 'plant_id',
//           as: 'plantDetInfo'
//         }
//       },
//       {
//         $unwind: '$plantDetInfo'
//       },
//       {
//         $lookup: {
//           from: 'Images',
//           localField: 'plant_id',
//           foreignField: 'plant_id',
//           as: 'image'
//         }
//       },
//       {
//         $unwind: '$image'
//       },
//       {
//         $match: {
//           'plantInfo.category': 'shrub'
//         }
//       }
      
//     ];
//   }
//     const result = await plantsNameCollection.aggregate(pipeline).toArray();
//     console.log('Fetched data:', result);
//     console.log('Pipeline:', pipeline);
//     return result;
//   } catch (err) {
//     console.error('Error fetching data:', err);
//   } finally {
//     await client.close();
//   }
// }
// async function fetchData3(searchTerm = "") {
//   const uri = 'mongodb+srv://ritheshp11:admin@herbcartel.bilcy0r.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB URI
//   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
//   try {
//     await client.connect();

//     const database = client.db('herbel_cartel');
//     const plantsCollection = database.collection('Plants');
//     const plantsNameCollection = database.collection('Plants_name');
//     let pipeline =[];
//     if (searchTerm) {
//       pipeline = [
//         {
//           $lookup: {
//             from: 'Plants',
//             localField: 'plant_id',
//             foreignField: 'plant_id',
//             as: 'plantInfo'
//           }
          
//         },
//         {
//           $unwind: '$plantInfo'
//         },
//         {
//           $lookup: {
//             from: 'plants_properties',
//             localField: 'plant_id',
//             foreignField: 'plant_id',
//             as: 'plantDetInfo'
//           }
//         },
//         {
//           $unwind: '$plantDetInfo'
//         },
//         {
//           $lookup: {
//             from: 'Images',
//             localField: 'plant_id',
//             foreignField: 'plant_id',
//             as: 'image'
//           }
//         },
//         {
//           $unwind: '$image'
//         },
//         {
//           $match: {
//             $and: [
//               {
//                 $or: [
//                   {
//                     'plantInfo.scientific_name': {
//                       $regex: new RegExp(searchTerm, 'i')
//                     }
//                   },
//                   {
//                     'plantInfo.introduction': {
//                       $regex: new RegExp(searchTerm, 'i')
//                     }
//                   },
//                   {
//                     'english': {
//                       $regex: new RegExp(searchTerm, 'i')
//                     }
//                   },
//                   {
//                     'plantDetInfo.uses': {
//                       $regex: new RegExp(searchTerm, 'i')
//                     }
//                   },
//                   {
//                     'plantDetInfo.additional_info': {
//                       $regex: new RegExp(searchTerm, 'i')
//                     }
//                   },
//                   {
//                     'plantDetInfo.demerits': {
//                       $regex: new RegExp(searchTerm, 'i')
//                     }
//                   },
//                   // Add more conditions using $or as needed
//                 ]
//               },
//               {
//                 'plantInfo.category': 'tree'
//               }
//             ]
//           }
//         }
        
//         ];
//     }
//     else{
//     pipeline = [
//       {
//         $lookup: {
//           from: 'Plants',
//           localField: 'plant_id',
//           foreignField: 'plant_id',
//           as: 'plantInfo'
//         }
        
//       },
//       {
//         $unwind: '$plantInfo'
//       },
//       {
//         $lookup: {
//           from: 'plants_properties',
//           localField: 'plant_id',
//           foreignField: 'plant_id',
//           as: 'plantDetInfo'
//         }
//       },
//       {
//         $unwind: '$plantDetInfo'
//       },
//       {
//         $lookup: {
//           from: 'Images',
//           localField: 'plant_id',
//           foreignField: 'plant_id',
//           as: 'image'
//         }
//       },
//       {
//         $unwind: '$image'
//       },
//       {
//         $match: {
//           'plantInfo.category': 'tree'
//         }
//       }
      
//     ];
//   }
//     const result = await plantsNameCollection.aggregate(pipeline).toArray();
//     console.log('Fetched data:', result);
//     console.log('Pipeline:', pipeline);
//     return result;
//   } catch (err) {
//     console.error('Error fetching data:', err);
//   } finally {
//     await client.close();
//   }
// }
// // Call the function to fetch data
//   app.get('/Home', async(req, res) => {
//  //    let Plants=await  fetchData();
// //     console.log("data inside endpoint is"+Plants)
// //      PlantsModel.find()
// //      .then(Plants => res.json(Plants))
// //      .catch(err => res.json(err))
// //      console.log("server is runninga")
//  //    res.json(Plants);
//  const searchTerm = req.query.search || "";
//   let Plants = await fetchData(searchTerm);
//   res.json(Plants);
//   })   
//   app.get('/Herbs', async(req, res) => {
//     //    let Plants=await  fetchData();
//    //     console.log("data inside endpoint is"+Plants)
//    //      PlantsModel.find()
//    //      .then(Plants => res.json(Plants))
//    //      .catch(err => res.json(err))
//    //      console.log("server is runninga")
//     //    res.json(Plants);
//     const searchTerm = req.query.search || "";
//      let Plants = await fetchData1(searchTerm);
//      res.json(Plants);
//      })  
//      app.get('/Shrubs', async(req, res) => {
//       //    let Plants=await  fetchData();
//      //     console.log("data inside endpoint is"+Plants)
//      //      PlantsModel.find()
//      //      .then(Plants => res.json(Plants))
//      //      .catch(err => res.json(err))
//      //      console.log("server is runninga")
//       //    res.json(Plants);
//       const searchTerm = req.query.search || "";
//        let Plants = await fetchData2(searchTerm);
//        res.json(Plants);
//        })
//        app.get('/Trees', async(req, res) => {
//         //    let Plants=await  fetchData();
//        //     console.log("data inside endpoint is"+Plants)
//        //      PlantsModel.find()
//        //      .then(Plants => res.json(Plants))
//        //      .catch(err => res.json(err))
//        //      console.log("server is runninga")
//         //    res.json(Plants);
//         const searchTerm = req.query.search || "";
//          let Plants = await fetchData3(searchTerm);
//          res.json(Plants);
//          })               
// // app.get('/Home', async (req, res) => {
// //     try {
// //       const plants = await PlantsModel.find();
// //       console.log("server is running");
// //       res.json(plants);
// //     } catch (err) {
// //       console.error("Error fetching plants:", err);
// //       res.status(500).json({ error: "Failed to fetch plants" });
// //     }
// //   });
// app.listen(3000, () => {
//     console.log("server is running1")
// })
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();

let records = [];

//Get all students
router.get('/', (req, res) => {
  res.send('App is running..');
});

//Create new record
router.post('/add', (req, res) => {
  res.send('New record added.');
});

//delete existing record
router.delete('/', (req, res) => {
  res.send('Deleted existing record');
});

//updating existing record
router.put('/', (req, res) => {
  res.send('Updating existing record');
});

//showing demo records
router.get('/demo', (req, res) => {
  res.json([
    {
      id: '001',
      name: 'Smith',
      email: 'smith@gmail.com',
    },
    {
      id: '002',
      name: 'Sam',
      email: 'sam@gmail.com',
    },
    {
      id: '003',
      name: 'lily',
      email: 'lily@gmail.com',
    },
  ]);
});

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);