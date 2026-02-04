import { IEmailConfig } from "./IEmailConfig";
import { IBingoColorsConfig } from "./value-object/IBingoColorsConfig";


export interface IOnlineHouseSettings{
    enabledScratch :boolean;
    emailConfig:  IEmailConfig;
    bingoColorsConfig : IBingoColorsConfig;
}
