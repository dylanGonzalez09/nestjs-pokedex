import { Injectable } from '@nestjs/common';
import { PokeResp } from './interfaces/pokemon.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly PokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async excecuteSeed() {
    await this.PokemonModel.deleteMany();

    const data = await this.http.get<PokeResp>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    const pokemonstToInsert: { name: string; no: number }[] = [];

    data.results.forEach((pokemon) => {
      const segments = pokemon.url.split('/');
      const name = pokemon.name;
      const no = +segments[segments.length - 2];

      pokemonstToInsert.push({ name, no });
    });

    await this.PokemonModel.insertMany(pokemonstToInsert);

    return 'SEEED EXECUTED';
  }
}
