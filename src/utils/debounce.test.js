import { debounceFunction } from './debounce';

const callback = jest.fn();

jest.useFakeTimers();

afterEach(() => {
    callback.mockReset();
    jest.clearAllTimers()
});

test('test debounce', async () => {
    const debouncedCallback = debounceFunction(callback, 10);
    for (let i = 0; i < 100; i++) {
        debouncedCallback();
    }

    expect(callback).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(callback).toBeCalledTimes(1);
})