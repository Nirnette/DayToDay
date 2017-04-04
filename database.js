/**
 * Created by root on 22/03/17.
 */
const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;


mongoose.plugin(slug);
/////////////////////////////////////////////////////////////////////
// User schema
/////////////////////////////////////////////////////////////////////
let userSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
    created_at: { type: Date, default: Date.now }
});
let User = mongoose.model('User', userSchema);

/////////////////////////////////////////////////////////////////////
// All Schemas concerning the groceries
/////////////////////////////////////////////////////////////////////

// Defining the categories ex. Food, cleaning etc....
let groceryCategorySchema = new Schema ({
    name: {type: String, unique: true},
});
let GroceryCategory = mongoose.model('GroceryCategory', groceryCategorySchema);

// Defining the families ex. Fruits, meat etc....
let groceryFamilySchema = new Schema ({
    name: {type: String, unique: true},
    category: {type: ObjectId, ref:'groceryCategorySchema'}
});
let GroceryFamily= mongoose.model('GroceryFamily', groceryFamilySchema);

// One item for all lists
let groceryItemSchema = new Schema ({
    name: {type: String, unique: true},
    family: {type: ObjectId, ref:'groceryFamilySchema'}
});
let GroceryItem = mongoose.model('GroceryItem', groceryItemSchema);

// one item with quantity and only for one user(list)
let basketItemSchema = new Schema ({
    grocery: {type: ObjectId, ref:'grocerySchema'},
    active: Boolean,
    quantity: Number,
    user: {type: ObjectId, ref:'userSchema'}
});
let BasketItem = mongoose.model('BasketItem', basketItemSchema);

/////////////////////////////////////////////////////////////////////
// Schemas concerning the todolist
/////////////////////////////////////////////////////////////////////

// Creating a todolist
let todoListSchema = new Schema ({
    name: String,
    user: {type: ObjectId, ref:'userSchema'},
    guests: [{type: ObjectId, ref:'userSchema'}]
});
let todoList = mongoose.model('todoList', todoListSchema);

// Creating a todoItem
let todoItemSchema = new Schema ({
    name: String,
    list: {type: ObjectId, ref:'todoListSchema'},
    active: Boolean
});
let todoItem = mongoose.model('todoItem', todoItemSchema);


/////////////////////////////////////////////////////////////////////
// Schemas concerning the financial follower
/////////////////////////////////////////////////////////////////////

// Create a reason for the financial follower
let financeReasonSchema = new Schema({
    name: String,
    user: {type: ObjectId, ref:'userSchema'},
    guests: [{type: ObjectId, ref:'userSchema'}]
});
let financeReason = mongoose.model('financeReason', financeReasonSchema);

// Create a type for financeFees ex. Cultural, restaurant, museum...
let financeTypeSchema = new Schema ({
    name: String,
});
let FinanceType= mongoose.model('FinanceType', financeTypeSchema);

// Creating distribution Schema for financeFees ex. Cultural, restaurant, museum... (50% first guest, 50% second guest...)
let financeDistributionFeeSchema = new Schema ({
    user: {type: ObjectId, ref:'userSchema'},
    part: Number
});
let FinanceDistributionFee= mongoose.model('FinanceDistributionFee', financeDistributionFeeSchema);

// Create a fee for a financeReason
let financeFeeSchema = new Schema ({
    name: String,
    reason: {type: ObjectId, ref:'financeReasonSchema'},
    price: Number,
    paidBy: {type: ObjectId, ref:'userSchema'},
    date: Date,
    type: {type: ObjectId, ref:'financeTypeSchema'},
    distribution: [{type: ObjectId, ref:'financeTypeSchema'}]
});
let FinanceFee= mongoose.model('FinanceFee', financeDistributionFeeSchema);


// let createArticle = function createArticle(title, content){
//     let newArticle = new Article({title: title, content: content});
//     newArticle.save(function(err){
//         if (err){
//             console.log(err);
//         } else {
//             console.log('Article created');
//         }
//     });
// };

const database = {
    mongoose:mongoose,
    user:User,
    groceryItem: GroceryItem,
    basketItem: BasketItem,
};



module.exports = database;