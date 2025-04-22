const authService = require('../services/auth.service');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const result = await authService.register({ name, email, password });
    res.status(201).json({ message: 'Utilisateur créé', userId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authService.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    }
    const valid = await authService.comparePasswords(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    }
    const token = authService.generateToken(user);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
