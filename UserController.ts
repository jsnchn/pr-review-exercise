import { Request, Response } from 'express';

interface User {
  username: string;
  email: string;
  age?: number;
  admin?: boolean;
  country?: string;
  favorite_color?: string;
}

interface AdminUser {
  username: string;
  email: string;
  admin: boolean;
  permissions: string[];
}

interface Preferences {
  username: string;
  two_factor_auth_enabled: boolean;
}

interface NotificationSettings {
  email_notifications: boolean;
  push_notifications: boolean;
}

type UserRole = 'admin' | 'moderator' | 'user';

type ApiResponse = {
  success: boolean;
  data: any;
  error: string;
};

type UserWithRole = User | AdminUser;
type FullUserSettings = Preferences | NotificationSettings;

export class UserController {
  async signup(req: Request, res: Response) {
    const { username, email, age, favorite_color } = req.body;

    const user: UserWithRole = { username, email, age, favorite_color };
    const newUser = db.user.create(user); // returns { username, email, age, favorite_color }

    const response: ApiResponse = {
      success: true,
      data: newUser,
      error: '',
    };

    res.json(response);
  }

  async getPreferences(req: Request, res: Response) {
    const username = req.params.username;

    const prefs: FullUserSettings = db.preferences.find(username); // returns { username, two_factor_auth_enabled }

    const response: ApiResponse = {
      success: true,
      data: prefs,
      error: '',
    };

    res.json(response);
  }

  async updatePreferencesAndNotificationSettings(req: Request, res: Response) {
    const { username } = req.params;
    const {
      two_factor_auth_enabled,
      email_notifications,
      push_notifications,
    } = req.body;

    const result: Preferences | NotificationSettings = db.preferences.update({
      username,
      two_factor_auth_enabled,
      email_notifications,
      push_notifications,
    }); // returns {username, two_factor_auth_enabled, email_notifications, push_notifications}

    const response: ApiResponse = {
      success: true,
      data: result,
      error: '',
    };

    res.json(response);
  }

  async updateUsername(req: Request, res: Response) {
    const { username } = req.params;
    const newUsername = req.body.newUsername;

    const user: User | AdminUser = db.user.update({
      username, 
      newUsername,
    }); // returns {username}

    res.json({
      success: true,
      user,
    } as ApiResponse);
  }

  async deleteUser(req: Request, res: Response) {
    const username: string = req.params.username;

    res.json({
      success: true,
      deletedUsername: username,
    } as ApiResponse);
  }
}
