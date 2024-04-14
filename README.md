# Название вашего проекта

## Описание

Проект представляет собой упрощенную версию популярных кинематографических такой платформы как Кинопоиск. Этот веб-приложение разработано на основе React с использованием TypeScript и Redux.

### Основные функции:

1. Поиск фильмов: Пользователи могут использовать поиск для нахождения фильмов по названию.
2. Просмотр информации о фильмах: Подробная информация о фильмах, включая описание, актерский состав, рейтинги и отзывы пользователей.
3. Фильтрация и сортировка: Возможность фильтрации фильмов по различным критериям, таким год выпуска, страна, возрастные ограничения.

### Stack

React, Typescript, Redux, React-Router, Ant Design, Vite

## Инструкция по запуску

1. Клонируйте репозиторий на локальную машину:

   ```bash
   git clone https://github.com/2headpepe/avito-project
   ```

2. Перейдите в директорию проекта:

   ```bash
   cd avito-project
   ```

3. Установите зависимости:

   ```bash
   npm install
   ```

4. Настройка переменных окружения:

- Создайте файл .env в корне проекта.
- Добавьте переменную окружения `VITE_KINOPOISK_API_KEY` в файл .env

  ```
  VITE_KINOPOISK_API_KEY=your_api_key
  ```

4. Запустите проект в dev моде:

   ```bash
   npm run dev
   ```

5. Проект запустится на порте 7070

### Также можно запустить используя Docker:

Необходимо зайти в рабочую директорию, добавить файл .env с токеном и выполнить команду

```
sudo docker-compose up -d --build
```

Контейнер запустится также на порте 7070

## Запросы к апи

### Запрос `fetchCountryList`

#### Описание

Этот запрос позволяет получить список стран.

#### Сигнатура запроса

```typescript
(): Promise<TCountryResponse>
```
#### Типы

```typescript
export type TCountry = {
  name: string;
  slug: string;
}[];
```

### Запрос `fetchFilmInfo`

#### Описание

Этот запрос позволяет получить информацию о фильме по его идентификатору.

#### Сигнатура запроса

```typescript
fetchFilmInfo(id: number): Promise<TFetchFilmInfoPayload>
```

#### Входные параметры

- id (number): Идентификатор фильма.

#### Типы

```typescript
export type TFetchFilmInfoPayload = {
  filmInfo: TFilmResponse;
  id: number;
};
```

### Запрос `fetchFilmsPage`

#### Описание

Этот запрос позволяет получить страницу с фильмами в соответствии с заданными параметрами.

#### Сигнатура запроса

```typescript
async ({
  page,
  limit,
  year,
  country,
  ageRating,
  type,
  query,
}: TFetchFilmPage): Promise<TFetchFilmPageResponse>
```

#### Входные параметры

- page (number): Номер страницы.
- limit (number): Максимальное количество фильмов на странице.
- year (string): Год выпуска фильма (опционально).
- country (string): Страна производства фильма (опционально).
- ageRating (string): Возрастной рейтинг фильма (опционально).
- type (string): Тип (опционально).
- query (string): Поисковый запрос (опционально).

#### Типы

```typescript
export interface TFilm {
  status: string | null;
  rating: {
    kp: number | null;
    imdb: number | null;
    filmCritics: number | null;
    russianFilmCritics: number | null;
    await: number | null;
  };
  votes: {
    kp: number | null;
    imdb: number | null;
    filmCritics: number | null;
    russianFilmCritics: number | null;
    await: number | null;
  };
  backdrop: {
    url: string | null;
    previewUrl: string | null;
  };
  movieLength: number | null;
  id: number;
  type: string | null;
  name: string | null;
  description: string | null;
  year: number | null;
  poster: {
    url: string | null;
    previewUrl: string | null;
  };
  genres: {
    name: string;
  }[];
  countries: {
    name: string;
  }[];
  typeNumber: number | null;
  alternativeName: string | null;
  enName: string | null;
  names: {
    name: string;
    language: string | null;
    type: string | null;
  }[];
  ratingMpaa: string | null;
  shortDescription: string | null;
  ticketsOnSale: boolean;
  ageRating: number | null;
  logo: {
    url: string;
  };
  top10: number | null;
  top250: number | null;
  isSeries: boolean;
  seriesLength: number | null;
  totalSeriesLength: number | null;
}

export interface TFilmResponse {
  docs: TFilm[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}
```

### Запрос `fetchImagesPage`

#### Описание

Этот запрос позволяет получить страницу с изображениями для определенного фильма.

#### Сигнатура запроса

```typescript
async ({
  page,
  movieId,
}: TFetchImagesPageProps): Promise<TFetchImagesPagePayload>
```

#### Типы

```typescript
export type TFetchImagesPageProps = {
  page: number;
  movieId: number;
};

export type TFetchImagesPagePayload = {
  movieId: number;
  images: TImageResponse;
};

export type TImageResponse = {
  docs: TImage[];
  total: number;
  limit: number;
  page: number;
  pages: number;
};
export type TImage = {
  movieId: number;
  type: string;
  language: string;
  url: string;
  previewUrl: string;
  height: number;
  width: number;
};
```

### Запрос `fetchSeasonsPage`

#### Описание

Этот запрос позволяет получить страницу с информацией о сезонах для определенного фильма или сериала.

#### Сигнатура запроса

```typescript
async ({
  page,
  movieId,
  limit,
}: TFetchSeasonsPageProps): Promise<TFetchSeasonsPagePayload>
```

#### Входные параметры

- page (number): Номер страницы.
- movieId (number): Идентификатор фильма или сериала.
- limit (number): Максимальное количество сезонов на странице.

#### Типы

```typescript
export type TFetchSeasonsPageProps = {
  page: number;
  movieId: number;
  limit: number;
};

export type TFetchSeasonsPagePayload = {
  movieId: number;
  seasons: TSeasonsResponse;
};

export type TSeasonsResponse = {
  docs: TSeason[];
  total: number;
  limit: number;
  page: number;
  pages: number;
};
export type TSeason = {
  movieId: number;
  number: number;
  episodesCount: number;
  episodes: {
    number: number;
    name: string;
    enName: string;
    description: string;
    still: {
      url: string;
      previewUrl: string;
    };
  }[];
  poster: {
    url: string;
    previewUrl: string;
  };
  name: string;
  enName: string;
  duration: number;
  description: string;
  enDescription: string;
};
```

### Запрос `fetchUserReviews`

#### Описание

Этот запрос позволяет получить страницу с пользовательскими отзывами для определенного фильма или сериала.

#### Сигнатура запроса

```typescript
async ({
  page,
  limit,
  movieId,
}: TFetchUserReviewsProps): Promise<IUserReviewResponse>
```

#### Типы

```typescript
export type TFetchUserReviewsProps = {
  page: number;
  limit: number;
  movieId: number;
};

export interface IUserReviewResponse {
  docs: TReview[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}
export type TReview = {
  id: number;
  movieId: number;
  title: string;
  type: string;
  review: string;
  date: string;
  author: string;
  userRating: number;
  authorId: number;
};
```

#### Входные параметры

- page (number): Номер страницы.
- limit (number): Максимальное количество отзывов на странице.
- movieId (number): Идентификатор фильма или сериала.

### Входные параметры

- page (number): Номер страницы.
- movieId (number): Идентификатор фильма.

## Проблемы и решения

### Проблема 1: Запуск проекта в режиме разработчика должен происходить по команде TOKEN=<your api token> npm run start

Не смог разобраться как используя такой формат команды запустить приложение, поэтому оставил вариант с переменной среды, которая хранится в файле

### Проблема 2: Частые зависания апишки
