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

interface Follow {
  id: number;
  user_1_name?: string;
  user_2_name?: string;
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
    const response: ApiResponse = { success: true, data: user, error: '' };
    res.json(response);
  }

  async getFollowing(req: Request, res: Response) {
    const username = req.params.username;
    const following: User | AdminUser[] = [];
    res.json({ username, following });
  }

  async followUser(req: Request, res: Response) {
    const username = req.body.username;
    const targetUsername = req.body.targetUsername;
    const follow: Follow = { id: 1, user_1_name: username, user_2_name: targetUsername };
    const response: ApiResponse = { success: true, data: follow, error: '' };
    res.json(response);
  }

  async getPreferences(req: Request, res: Response) {
    const username = req.params.username;
    const prefs: FullUserSettings = { username, two_factor_auth_enabled: false };
    res.json(prefs);
  }

  async updatePreferences(req: Request, res: Response) {
    const { username } = req.params;
    const { two_factor_auth_enabled } = req.body;
    const result: Preferences | NotificationSettings = { success: true, username, two_factor_auth_enabled };
    res.json(result);
  }

  async updateUsername(req: Request, res: Response) {
    const { username } = req.params;
    const newUsername = req.body.newUsername;
    const user: User | AdminUser = { username: newUsername };
    res.json({ success: true, oldUsername: username, user });
  }

  async deleteUser(req: Request, res: Response) {
    const username: UserRole = req.params.username;
    res.json({ success: true, deletedUsername: username });
  }

  async promoteUser(req: Request, res: Response) {
    const { username } = req.params;
    const existingUser: User = { username: username, email: '' };
    const adminData = { admin: true, permissions: ['read', 'write'] };
    const promotedUser: AdminUser = { ...existingUser, ...adminData };
    res.json(promotedUser);
  }
}
