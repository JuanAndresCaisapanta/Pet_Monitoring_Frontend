import { FC, ReactNode } from "react";

import { CssBaseline, ThemeProvider } from "@mui/material";

import {
  AuthProvider,
  BreedProvider,
  DeviceProvider,
  MedicineProvider,
  PetProvider,
  ProfessionalProvider,
  ProfessionProvider,
  SpeciesProvider,
  TypeMedicineProvider,
  UiProvider,
  UserProvider,
} from "../context";
import { theme } from "../themes";

interface Props {
  children: ReactNode;
}

export const Providers: FC<Props> = ({ children }) => {
  return (
    <AuthProvider>
      <UserProvider>
        <TypeMedicineProvider>
          <ProfessionProvider>
            <SpeciesProvider>
              <BreedProvider>
                <PetProvider>
                  <DeviceProvider>
                    <MedicineProvider>
                      <ProfessionalProvider>
                        <UiProvider>
                          <ThemeProvider theme={theme}>
                            <CssBaseline />
                            {children}
                          </ThemeProvider>
                        </UiProvider>
                      </ProfessionalProvider>
                    </MedicineProvider>
                  </DeviceProvider>
                </PetProvider>
              </BreedProvider>
            </SpeciesProvider>
          </ProfessionProvider>
        </TypeMedicineProvider>
      </UserProvider>
    </AuthProvider>
  );
};
