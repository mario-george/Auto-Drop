
import User, { IUser } from '../src/models/user.model';
import Setting from '../src/models/Setting.model';

async function addSettingToExistingUsers() {
  // Get all users
  let users = await User.find();
users = users.filter((user:IUser)=>!user.setting)
  for (const user of users) {
    // Create a new setting document for each user
    const setting = new Setting();
    await setting.save();

    // Update the user's setting field with the _id of the new setting document
    user.setting = setting._id;
    await user.save();
  }
}

// Run the function
addSettingToExistingUsers().catch(console.error);