import uuid from 'uuid';
import * as dynamoDbLib from './libs/dynamodb-lib';
import { succes, failure } from './libs/response-lib';

export async function main(event, context, callback) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: 'notes',
        Item: {
            userId: event.requestContext.authorizer.claims.sub,
            noteId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: new Date().getTime(),
        },
    };

    try {
        const result = await dynamoDbLib.call('put', params);
        callback(null, succes(params.Item));
    }
    catch(e) {
        callback(null,  failure({status: false}));
    }
};