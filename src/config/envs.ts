import 'dotenv/config';

import * as joi from 'joi'
import { env } from 'process';

interface EnvVars{
    PORT: number;
    FIREBASE_CREDENTIALS_PATH: string;

}

const envsSchema = joi.object({
    PORT: joi.number().required(),
})


.unknown(true);

const {error, value} = envsSchema.validate(process.env);

if (error){
    throw new Error(`Config validation error: ${error.message}`);
}

const EnvVars: EnvVars = value;

export const envs = {
    port: EnvVars.PORT,
    firebase: EnvVars.FIREBASE_CREDENTIALS_PATH

};
