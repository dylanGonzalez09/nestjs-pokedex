import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResp } from './interfaces/pokemon.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  async excecuteSeed() {
    const { data } = await this.axios.get<PokeResp>(
      'https://pokeapi.co/api/v2/pokemon?limit=50',
    );

    data.results.forEach((pokemon) => {
      const segments = pokemon.url.split('/');
      const no = segments[segments.length - 2];

      console.log(segments, no);
    });

    return data;
  }
}
