/* Copyright (c) Microsoft Corporation. All rights reserved.
 * Copyright (c) 2016 Blizzard Entertainment
 * Licensed under the MIT License.
 *
 * Original Blizzard node-rdkafka sample modified for use with Azure Event Hubs for Apache Kafka Ecosystems
 */
 
var Transform = require('stream').Transform;
var Kafka = require('node-rdkafka');

var stream = Kafka.KafkaConsumer.createReadStream({
    'metadata.broker.list': 'eh2ehtesting.servicebus.windows.net:9093',
    'group.id': '$Default', //The default consumer group for EventHubs is $Default
    'socket.keepalive.enable': true,
    'enable.auto.commit': false,
    'security.protocol': 'SASL_SSL',
    'sasl.mechanisms': 'PLAIN',
    'sasl.username': '$ConnectionString',
    'sasl.password': 'Endpoint=sb://eh2ehtesting.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=IS435QyA5LdieHUQAYmVQ4bSMfBvfu24kCDuX5irjfg='

}, {}, {
        topics: 'kafkatest',
        waitInterval: 0,
        objectMode: false
    });

stream.on('error', function (err) {
    if (err) console.log(err);
    process.exit(1);
});

stream
    .pipe(process.stdout);

stream.on('error', function (err) {
    console.log(err);
    process.exit(1);
});

stream.consumer.on('event.error', function (err) {
    console.log(err);
})