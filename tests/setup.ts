import {configure} from '../src';
import { config } from 'dotenv';

config();

configure({
  apiKey: process.env.COINBASE_COMMERCE_API_KEY
})