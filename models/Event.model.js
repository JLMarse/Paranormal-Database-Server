const { Schema, model, SchemaType } = require("mongoose");

const eventSchema = new Schema(
    {

        title: {
            type: String,
            required: [true, 'Title is required.'],
            trim: true,
            default: '',
            unique: true

        },
        reportType: {
            type: String,
            required: [true, 'Report Type is required.'],
            enum: ['Big Cat', 'Ghost / Poltergeist', 'Cryptozoology (other than big cat)', 'Fairy', 'Folklore / Legend', 'Demonic Dog', 'UFO', 'Other']
        },
        locationDetails: {
            type: String,
            location: {
                type: {
                    type: String
                },
                coordinates: {
                    type: [Number]
                }
            },
        },
        date: {
            type: Date
        },
        furtherDetails: {
            type: String,
            trim: true,
            default: ''
        },
        cover: {
            type: String,
            trim: true,
            default: ''
        },

        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }

    },

    {
        timestamps: true
    }
);

eventSchema.index({ "$**": "text" }); // meto este indidce de texto para poder habitlitar la busqueda de texto.

const Event = model("event", eventSchema);

module.exports = Event;