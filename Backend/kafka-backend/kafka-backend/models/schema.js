var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root:root@cluster1-9j3qi.mongodb.net/SmartMeter?retryWrites=true&w=majority', { useNewUrlParser: true });

var userSchema = new mongoose.Schema({
    phone: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    solarPanelArea: String,
    currentApplianceInfo: Array,
    applianceScheduleResults: Array,
    costToPay:Array,
    hourlyInfo:Array,
    allSchedule: Array
})
var userModel = mongoose.model('user', userSchema, 'user');

module.exports = {
    userModel: userModel
}