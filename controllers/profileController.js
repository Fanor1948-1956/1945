// controllers/profileController.js
const {
  User,
  Patient,
  Doctor,
  Admin,
  ChiefMedical,
} = require("../models/userModel");

// Función para resolver el rol
const resolveRole = (rolesFound) => {
  const roleNames = rolesFound.map((role) => role.name);
  if (roleNames.includes("Patient")) {
    return Patient;
  } else if (roleNames.includes("Doctor")) {
    return Doctor;
  } else if (roleNames.includes("Admin")) {
    return Admin;
  } else if (roleNames.includes("ChiefMedical")) {
    return ChiefMedical;
  } else {
    return User;
  }
};
// controllers/profileController.js
exports.viewProfile = async (req, res) => {
    try {
        const user = await User.findById(req.session.userId).populate("roles");

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        // Si es una solicitud AJAX o Fetch, devuelve JSON
        if (req.xhr || req.headers['accept'] === 'application/json') {
            return res.json({
                user,
                isAuthenticated: req.session.authenticated,
            });
        }

        // Renderiza la vista de perfil si no es una solicitud AJAX
        res.render("pages/privatePages/auth/profile.njk", {
            user,
            isAuthenticated: req.session.authenticated,
        });
    } catch (error) {
        console.error("Error al ver el perfil:", error);
        res.status(500).json({ message: "Error al ver el perfil" });
    }
};
exports.updateProfile = async (req, res) => {
  const { name, surnames, email, gender } = req.body; // Ajusta según tus campos
  try {
    await User.findByIdAndUpdate(req.session.userId, {
      name,
      surnames,
      email,
      gender,
    });
    res.redirect("/profile?message=Perfil actualizado correctamente");
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    res.status(500).send("Error al actualizar el perfil");
  }
};