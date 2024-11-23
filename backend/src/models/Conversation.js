const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['private', 'group'],
    required: true
  },
  participants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      enum: ['admin', 'member'],
      default: 'member'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  name: {
    type: String,
    required: function() {
      return this.type === 'group';
    }
  },
  avatar: {
    type: String
  },
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  },
  settings: {
    notifications: {
      type: Boolean,
      default: true
    },
    encryption: {
      enabled: {
        type: Boolean,
        default: true
      },
      publicKey: String
    }
  },
  metadata: {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    description: String
  }
}, {
  timestamps: true
});

// Indexes for faster queries
conversationSchema.index({ participants: 1 });
conversationSchema.index({ 'participants.user': 1, updatedAt: -1 });

// Virtual for getting participant count
conversationSchema.virtual('participantCount').get(function() {
  return this.participants.length;
});

// Method to add participant
conversationSchema.methods.addParticipant = async function(userId, role = 'member') {
  if (!this.participants.some(p => p.user.toString() === userId.toString())) {
    this.participants.push({
      user: userId,
      role,
      joinedAt: new Date()
    });
    await this.save();
  }
  return this;
};

// Method to remove participant
conversationSchema.methods.removeParticipant = async function(userId) {
  this.participants = this.participants.filter(
    p => p.user.toString() !== userId.toString()
  );
  await this.save();
  return this;
};

// Method to update participant role
conversationSchema.methods.updateParticipantRole = async function(userId, newRole) {
  const participant = this.participants.find(
    p => p.user.toString() === userId.toString()
  );
  if (participant) {
    participant.role = newRole;
    await this.save();
  }
  return this;
};

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
