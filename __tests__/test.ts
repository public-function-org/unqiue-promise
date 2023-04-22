import uniquePromise from "../src/index";

test('Should only trigger once', async ()=>{
    let value = 0;
    let executed = 0;
    const executeLongRunningFunction = async (): Promise<number> => {
        executed++;
        return new Promise(resolve => {
            setTimeout(()=>{
                value++;
                resolve(value);
            }, 300);
        })
    }

    const results = await Promise.all([
        uniquePromise('test', executeLongRunningFunction),
        uniquePromise('test', executeLongRunningFunction),
    ]);

    expect(results).toEqual([1,1]);
    expect(executed).toBe(1);
});

test('Should trigger twice', async ()=>{
    let value = 0;
    let executed = 0;
    const executeLongRunningFunction = async (): Promise<number> => {
        executed++;
        return new Promise(resolve => {
            setTimeout(()=>{
                value++;
                resolve(value);
            }, 300);
        })
    }

    const value1 = await uniquePromise('test', executeLongRunningFunction);
    const value2 = await uniquePromise('test', executeLongRunningFunction);

    expect(value1).toBe(1);
    expect(value2).toBe(2);
    expect(executed).toBe(2);
});
