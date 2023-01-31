import { Kafka } from 'kafkajs'
import env from '@/main/config/env'
import { KafkaConsumerData } from '@/infra/kafka'
import { Controller } from '@/presentation/protocols'

export const setupKafka = async (controller: Controller): Promise<void> => {
    const kafkaServer = new Kafka({
        clientId: env.kafkaClientId,
        brokers: [`${env.kafkaBrokerHost}: ${env.kafkaBrokerPort}`]
    })
    const kafka = new KafkaConsumerData(kafkaServer, controller)
    await kafka.kafkaConsumer()
}
