import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      unique: true,
      required: true // Added required validation
    },
    email: { 
      type: String, 
      unique: true,
      required: true // Added required validation
    },
    phone: { 
      type: String, 
      required: false, // Optional phone field
    },
    password: { 
      type: String, 
      required: true // Added required validation
    },
    isActive: { 
      type: Boolean, 
      default: false 
    },
    activationToken: { 
      type: String, 
      required: false 
    },
    activationTokenExpires: { // Added field for token expiration
      type: Date,
      required: false
    },
    resetPasswordToken: { 
      type: String, 
      required: false 
    },
    resetPasswordExpires: { 
      type: Date, 
      required: false 
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Usermodel = mongoose.model("User", userSchema, "Users");

// URL Schema
const urlSchema = new mongoose.Schema(
  {
    originalUrl: { 
      type: String, 
      required: true 
    },
    shortUrl: { 
      type: String, 
      required: true 
    },
    clickCount: { 
      type: Number, 
      default: 0 
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
    createdBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    },
    user_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true 
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const UrlModel = mongoose.model('URL', urlSchema, 'urls');

export { Usermodel, UrlModel };
  