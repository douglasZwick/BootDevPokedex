type TimeStamp = number;


type CacheEntry<T> =
{
  createdAt: TimeStamp;
  val: T;
}


export class Cache
{
  #cache = new Map<string, CacheEntry<any>>();


  add<T>(key: string, val: T)
  {
    const entry =
    {
      createdAt: Date.now(),
      val: val,
    }

    this.#cache.set(key, entry);
  }


  get<T>(key: string)
  {
    if (!this.#cache.has(key))
      return undefined;

    return this.#cache.get(key);
  }
}
