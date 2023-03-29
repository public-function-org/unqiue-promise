type Identifier = string | number | object
const uniquePromises: Map<string, Promise<unknown>> = new Map();

const uniquePromise = <T>(id: Identifier, fetch: () => Promise<T>): Promise<T> => {
    const stringId = JSON.stringify(id);
    if (uniquePromises.has(stringId)) {
        return uniquePromises.get(stringId) as Promise<T>;
    }
    const originalPromise = fetch()
    uniquePromises.set(stringId, originalPromise);

    originalPromise.then(
        res => {
            uniquePromises.delete(stringId);
            return res;
        },
        err => {
            uniquePromises.delete(stringId);
            throw err;
        }
    );

    return originalPromise;
}

export default uniquePromise;
