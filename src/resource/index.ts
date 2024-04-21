import { http } from '@/client';

export abstract class ApiResource {

  protected constructor(data?: NodeJS.Dict<any>) {
    for (let key of Object.keys(data || {})) {
      this[key] = data[key];
    }
  }

  public abstract getPath(): string;

  protected async delete(): Promise<this> {
    return http().delete(this.getPath());
  }

  protected async list(): Promise<this[]> {
    return http().get(this.getPath())
      .then((response) => response.data.data);
  }

  protected async retrieve(): Promise<this> {
    return http().get(this.getPath()).then((response) => {
      this.saveUpdate(response.data);
      return this;
    });
  }

  protected async update(): Promise<this> {
    return http().put(this.getPath(), this.serialize());
  }

  protected async save(): Promise<this> {
    return http().post(this.getPath(), this.serialize())
      .then((response) => {
        this.saveUpdate(response.data.data);
        return this;
      });
  }

  private serialize(): NodeJS.Dict<any> {
    return mapObjectNamingScheme(this);
  }

  private saveUpdate(data: { data: NodeJS.Dict<any> }): NodeJS.Dict<any> {
    const mapped = mapObjectNamingScheme(data);

    for (let key of Object.keys(mapped)) {
      this[key] = data[key] || null;
    }

    return mapped;
  }
}

export function mapObjectNamingScheme(object: NodeJS.Dict<any>): NodeJS.Dict<any> {
  const newDict = {};

  for (const key of Object.keys(object)) {
    const value = object[key];

    if (typeof value === 'function') {
      continue;
    }

    let newName = '';

    if (key.includes('_')) {
      newName = key.split('_').map((value, index) => {
        if (index > 0 && value.length > 1) {
          return value.charAt(1) + value.substring(1, value.length);
        }

        return value;
      }).join('');
    } else {
      for (let letter of key) {
        if (letter == letter.toUpperCase()) {
          newName += '_' + letter.toLowerCase();
        } else {
          newName += letter;
        }
      }

      newDict[newName] = typeof value === 'object' && key !== 'metadata' && !Array.isArray(value) ?
        mapObjectNamingScheme(value) : value;
    }
  }

  return newDict;
}

export * from './charge';
export * from './checkout';
