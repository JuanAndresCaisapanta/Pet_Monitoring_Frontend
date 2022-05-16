import jwt from "jsonwebtoken";

export const signToken = (user: string) => {
  if (!process.env.NEXT_PUBLIC_JWT_SECRET_SEED) {
    throw new Error("No hay semilla de JWT - Revisar variables de entorno");
  }

  return jwt.sign(
    // payload
    { user },

    // Seed
    process.env.NEXT_PUBLIC_JWT_SECRET_SEED

    // Opciones
  );
};

export const isValidToken = (token: string): Promise<string> => {
  if (!process.env.NEXT_PUBLIC_JWT_SECRET_SEED) {
    throw new Error("No hay semilla de JWT - Revisar variables de entorno");
  }

  return new Promise((resolve, reject) => {
    try {
      jwt.verify(
        token,
        process.env.NEXT_PUBLIC_JWT_SECRET_SEED || "",
        (err, payload) => {
          if (err) return reject(err);

          const { sub } = payload as { sub: string };

          resolve(sub);
        }
      );
    } catch (error) {
      reject("JWT no es válido");
    }
  });
};





