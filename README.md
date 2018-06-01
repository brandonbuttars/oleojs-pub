# OLEO Pub

OLEO Pub is the Pub/Sub code used inside of the OLEOjs projects.

## OleoPubSubClass(alias = 'PubSub')

### PRIVATE

#### \_uid(topic)

#### \_publish(topic, info)

#### \_subscribe(topic, listener)

#### \_unsubscribe(topic, index)

#### \_riot_off(component, topic, index)

### PUBLIC

#### push(topic, info)

#### on(topic, listener, component = false)

#### off(topic, index)
