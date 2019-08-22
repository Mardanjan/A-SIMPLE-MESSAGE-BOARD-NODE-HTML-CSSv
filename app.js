var koa = require('koa');
var app = new koa();
var router = require('koa-router')();
// CORS��һ��W3C��׼��ȫ����"������Դ����"��Cross-origin resource sharing����
// ������koa2-corsΪ����
const cors = require('koa2-cors');

// ������������ں�����н���
app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return "*"; // ��������������������
        }
        return 'http://localhost:8080'; // ��������ֻ���� http://localhost:8080 ���������������
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

router.post('/', async function (ctx) {
    ctx.body = '��ϲ __С��__ ��ɹ���½��'
});

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);