import Dexie from 'dexie';

export const eventsDatabase = new Dexie('eventsDatabase');
eventsDatabase.version(1).stores({
    events: '++id, name, date', // Primary key and indexed props
});
