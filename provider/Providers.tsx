import { FC, ReactNode } from "react";

import { CssBaseline, ThemeProvider } from "@mui/material";

import {
  AuthProvider,
  BreedProvider,
  DeviceProvider,
  MedicineProvider,
  NotificationProvider,
  PetProvider,
  ProfessionalProvider,
  ProfessionProvider,
  SpeciesProvider,
  EstablishmentTypeProvider,
  MedicineTypeProvider,
  UiProvider,
  UserProvider,
} from "../context";
import { theme } from "../themes";
import { EstablishmentProvider } from "../context/establishment/EstablishmentProvider";

interface Props {
  children: ReactNode;
}

export const Providers: FC<Props> = ({ children }) => {
  return (
    <AuthProvider>
      <UserProvider>
        <MedicineTypeProvider>
          <ProfessionProvider>
            <EstablishmentTypeProvider>
              <SpeciesProvider>
                <BreedProvider>
                  <PetProvider>
                    <DeviceProvider>
                      <MedicineProvider>
                        <ProfessionalProvider>
                          <EstablishmentProvider>
                            <NotificationProvider>
                              <UiProvider>
                                <ThemeProvider theme={theme}>
                                  <CssBaseline />
                                  {children}
                                </ThemeProvider>
                              </UiProvider>
                            </NotificationProvider>
                          </EstablishmentProvider>
                        </ProfessionalProvider>
                      </MedicineProvider>
                    </DeviceProvider>
                  </PetProvider>
                </BreedProvider>
              </SpeciesProvider>
            </EstablishmentTypeProvider>
          </ProfessionProvider>
        </MedicineTypeProvider>
      </UserProvider>
    </AuthProvider>
  );
};
