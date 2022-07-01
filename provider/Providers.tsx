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
  TypeEstablishmentProvider,
  TypeMedicineProvider,
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
        <TypeMedicineProvider>
          <ProfessionProvider>
            <TypeEstablishmentProvider>
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
            </TypeEstablishmentProvider>
          </ProfessionProvider>
        </TypeMedicineProvider>
      </UserProvider>
    </AuthProvider>
  );
};
