import { Request, Response } from 'express';

interface User {
  username: string;
  email: string;
  age?: number;
  admin?: boolean;
  country?: string;
  favorite_color?: string;
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

export class UserController {
  async signup(req: Request, res: Response) {
    const { username, email, age, favorite_color } = req.body;
    res.json({ success: true, user: { username, email, age, favorite_color } });
  }

  async getFollowing(req: Request, res: Response) {
    const { username } = req.params;
    const following = [];
    res.json({ username, following });
  }

  async followUser(req: Request, res: Response) {
    const { username, targetUsername } = req.body;
    res.json({ success: true, user_1_name: username, user_2_name: targetUsername });
  }

  async getPreferences(req: Request, res: Response) {
    const { username } = req.params;
    res.json({ username, two_factor_auth_enabled: false });
  }

  async updatePreferences(req: Request, res: Response) {
    const { username } = req.params;
    const { two_factor_auth_enabled } = req.body;
    res.json({ success: true, username, two_factor_auth_enabled });
  }

  async updateUsername(req: Request, res: Response) {
    const { username } = req.params;
    const { newUsername } = req.body;
    res.json({ success: true, oldUsername: username, newUsername });
  }

  async deleteUser(req: Request, res: Response) {
    const { username } = req.params;
    res.json({ success: true, deletedUsername: username });
  }
}
