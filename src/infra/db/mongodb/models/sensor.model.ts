import mongoose, { Schema } from 'mongoose'

const SensorSchema = new Schema({
    accountId: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    sensorIdentification: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    sensorTenantId: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    sensorName: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    sensorEquipment: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    sensorMeasureType: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    sensorCurrentValue: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    sensorTimeStamp: {
        type: String,
        index: true,
        unique: true,
        required: true
    }
}, { timestamps: true })

export const SensorModel = mongoose.model('SensorModel', SensorSchema)
