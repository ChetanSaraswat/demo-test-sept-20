const Category = sequelize.define('Category', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  const Address = sequelize.define('Address', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    userId: {
      type: Sequelize.UUID,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: true,
    },
    restaurantId: {
      type: Sequelize.UUID,
      references: {
        model: Restaurant,
        key: 'id',
      },
      allowNull: true,
    },
    addressLine1: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    addressLine2: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    postalCode: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    country: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    latitude: {
      type: Sequelize.DECIMAL(10, 8),
      allowNull: true,
    },
    longitude: {
      type: Sequelize.DECIMAL(11, 8),
      allowNull: true,
    },
  });

  const Review = sequelize.define('Review', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    restaurantId: {
      type: Sequelize.UUID,
      references: {
        model: Restaurant,
        key: 'id',
      },
      allowNull: false,
    },
    userId: {
      type: Sequelize.UUID,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: false,
    },
    rating: {
      type: Sequelize.INTEGER, // rating 1 to 5
      allowNull: false,
    },
    comment: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  });

  const OrderItem = sequelize.define('OrderItem', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    orderId: {
      type: Sequelize.UUID,
      references: {
        model: Order,
        key: 'id',
      },
      allowNull: false,
    },
    menuItemId: {
      type: Sequelize.UUID,
      references: {
        model: MenuItem,
        key: 'id',
      },
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
  });
  const Order = sequelize.define('Order', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    userId: {
      type: Sequelize.UUID,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: false,
    },
    restaurantId: {
      type: Sequelize.UUID,
      references: {
        model: Restaurant,
        key: 'id',
      },
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM('pending', 'accepted', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'),
      defaultValue: 'pending',
    },
    totalAmount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    deliveryAddressId: {
      type: Sequelize.UUID,
      references: {
        model: Address,
        key: 'id',
      },
      allowNull: false,
    },
    deliveryAgentId: {
      type: Sequelize.UUID,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: true,
    },
    orderedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    }
  });
  
  const MenuItem = sequelize.define('MenuItem', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    restaurantId: {
      type: Sequelize.UUID,
      references: {
        model: Restaurant,
        key: 'id',
      },
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    isAvailable: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    categoryId: {
      type: Sequelize.UUID,
      references: {
        model: Category,
        key: 'id',
      },
      allowNull: false,
    },
  });

  const Restaurant = sequelize.define('Restaurant', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ownerId: {
      type: Sequelize.UUID,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    rating: {
      type: Sequelize.FLOAT,
      defaultValue: 0.0,
    },
    openingTime: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    closingTime: {
      type: Sequelize.TIME,
      allowNull: false,
    },
  });

  const User = sequelize.define('User', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: Sequelize.ENUM('customer', 'delivery_agent'),
      allowNull: false,
    },
    // other user-related fields like hashedPassword, profileImage etc.
  });
  
  chat =============//
  const MessageStatus = sequelize.define('MessageStatus', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    messageId: {
      type: Sequelize.UUID,
      references: {
        model: Message,
        key: 'id',
      },
      allowNull: false,
    },
    userId: {
      type: Sequelize.UUID,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM('sent', 'delivered', 'read'),
      defaultValue: 'sent',
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    }
  });

  const Message = sequelize.define('Message', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    chatId: {
      type: Sequelize.UUID,
      references: {
        model: Chat,
        key: 'id',
      },
      allowNull: false,
    },
    senderId: {
      type: Sequelize.UUID,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    }
  });

  const ChatParticipant = sequelize.define('ChatParticipant', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    chatId: {
      type: Sequelize.UUID,
      references: {
        model: Chat,
        key: 'id',
      },
      allowNull: false,
    },
    userId: {
      type: Sequelize.UUID,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: false,
    },
    role: {
      type: Sequelize.ENUM('admin', 'member'), // Define roles in a group chat
      defaultValue: 'member',
    },
    joinedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    }
  });
  
  const Chat = sequelize.define('Chat', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    type: {
      type: Sequelize.ENUM('private', 'group'), // Could be 'private' for 1-on-1 chats or 'group' for group chats
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING, // Optional title for group chats
      allowNull: true,
    },
    lastMessageId: {
      type: Sequelize.UUID, // Foreign key to the last message (for easy access to latest message)
      allowNull: true,
    }
  });

  const User = sequelize.define('User', {
    id: {
      type: Sequelize.UUID, // UUID is a good practice for user IDs
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    // other user-related fields
  });
  


  .addCase(fetchPostUser.fulfilled, (state, action) => {
    state.isLoading = false;
    const newPosts = action.payload?.filter(post => !state.data?.find(existingPost => existingPost._id === post._id));
    state.data = [...(state.data || []), ...newPosts];
    state.createdAt = action.payload[action.payload.length - 1]?.createdAt;
    console.log("action", state.data);
})



// services/postService.js
const postRepository = require('../repositories/postRepository');
const customError = require('../utils/customError');

exports.getPosts = async (queryParams) => {
  try {
    const { time } = queryParams;

    // Query for filtering posts by time (createdAt)
    const query = {};
    if (time) {
      query.createdAt = { [Op.lt]: new Date(time) }; // Sequelize operator for "less than"
    }

    // Fetch posts from the repository
    const posts = await postRepository.getPosts(query);

    if (posts.length === 0) {
      throw new customError('No posts found', 404);
    }

    return posts;
  } catch (error) {
    throw error;
  }
};

// controllers/postController.js
const postService = require('../services/postService');
const { handleSuccess, handleError } = require('../utils/responseHandler');
const httpStatusCode = require('http-status-codes');

exports.getPosts = async (req, res) => {
  try {
    const postData = await postService.getPosts(req.query);
    return handleSuccess(res, postData, httpStatusCode.OK);
  } catch (error) {
    console.error('Error in getPosts:', error.message);
    return handleError(res, error);
  }
};

// routes/postRoutes.js
const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.get('/posts', postController.getPosts);

module.exports = router;

// repositories/postRepository.js
const Post = require('../models/Post'); // Sequelize model
const BaseRepository = require('./BaseRepository');

class PostRepository extends BaseRepository {
  constructor() {
    super(Post);
  }

  async getPosts(query) {
    try {
      return await Post.findAll({
        where: query,
        include: [{ model: User, attributes: ['name'] }], // Join user data (assuming 'User' is a model)
        order: [['createdAt', 'DESC']],
        limit: 3,
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new PostRepository();
