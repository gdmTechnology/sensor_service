import { KafkaConsumer } from '@/data/protocols'
import { Kafka } from 'kafkajs'
import { Topics } from '@/main/config/kafka'
import env from '@/main/config/env'
import { Controller } from '@/presentation/protocols'

export class KafkaConsumerData implements KafkaConsumer {
    constructor(
        private readonly kafkaServer: Kafka,
        private readonly updateController: Controller
    ) { }

    async kafkaConsumer(): Promise<void> {
        const consumer = this.kafkaServer.consumer({ groupId: env.kafkaGroupId })
        await consumer.connect()
        await consumer.subscribe({ topic: Topics.MEASURE, fromBeginning: true })
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                // this.updateController.handle()
                console.log({
                    partition,
                    offset: message.offset,
                    value: message.value.toString()
                })
            }
        })
    }
}
