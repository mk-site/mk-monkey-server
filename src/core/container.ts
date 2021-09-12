import { Container } from 'inversify';

const monkeyContainer = new Container({
    skipBaseClassChecks: true,
});

export {
    monkeyContainer,
};