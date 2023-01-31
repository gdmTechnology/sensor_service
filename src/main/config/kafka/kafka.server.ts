import { Kafka } from 'kafkajs'
import env from '@/main/config/env'
import { KafkaConsumerData } from '@/infra/kafka'
import { Controller } from '@/presentation/protocols'

export const setupKafka = async (controller: Controller): Promise<void> => {
    const kafkaServer = new Kafka({
        clientId: env.KAFKA_CLIENTID,
        brokers: [`${env.KAFKA_BROKER_HOST}: ${env.KAFKA_BROKER_PORT}`]
    })
    const kafka = new KafkaConsumerData(kafkaServer, controller)
    await kafka.kafkaConsumer()
}
