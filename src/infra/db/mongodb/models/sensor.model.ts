import mongoose, { Schema } from 'mongoose'

const SensorSchema = new Schema({
    accountId: {
        type: String,
        required: true
    },
    deviceIdentification: {
        type: String,
        required: true,
        index: true
    },
    sensorIdentification: {
        type: String,
        unique: true,
        required: true
    },
    sensorTenantId: {
        type: String,
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
        required: true
    },
    sensorMeasureType: {
        type: String,
        required: true
    },
    sensorCurrentValue: {
        type: Number,
        required: true,
        default: 0
    },
    sensorTimeStamp: {
        type: String,
        required: true,
        default: new Date()
    }
}, { timestamps: true })
SensorSchema.index({ sensorName: 1, deviceIdentification: 1 }, { unique: true })
export const SensorModel = mongoose.model('SensorModel', SensorSchema)
