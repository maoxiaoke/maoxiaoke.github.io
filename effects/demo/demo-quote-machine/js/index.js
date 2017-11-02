/**
 * Created by maoxiaoke on 2017/3/20.
 */
///wrap all the code in a IIFE to prevent the global scope pollution;
;(function(){

    'use strict';

    // quotes collections

        var quotes = [{
                "quote": "凤兮归故乡<br>四海求起凰",
                "author": "李白"
            },{
                "quote": "所以念君者<br>为百年<br>不为一夕"
            },{
                "quote": "只缘感君一回顾<br>使我思君朝与暮"
            },{
                "quote": "金风玉露一相逢<br>便胜却人间无数",
                "author": "秦观"
            },{
                "quote": "平生不会相思<br>才会相思<br>便害相思",
                "author": "徐再思"
            },{
                "quote": "从前书信很慢<br>车马很远<br>一生只爱一个人",
                "author": "木心"
            },{
                "quote": "白茶清欢无别事<br>我在等风也等你"
            },{
                "quote": "三生有幸遇见你<br>纵使悲凉也是情"
            },{
                "quote": "霓为衣兮风为马<br>云之君兮纷纷而来下",
                "author": "李白"
            },{
                "quote": "除非黄土白骨<br>我守你百岁无忧"
            },{
                "quote": "取次花丛懒回顾<br>半缘修道半缘君",
                "author": "元稹"
            },{
                "quote": "关关雎鸠<br>在河之洲<br>窈窕淑女<br>君子好逑",
                "author": "诗经"
            },{
                "quote": "哪有人会喜欢孤独<br>不过是不喜欢失望",
                "author": "树上春树"
            },{
                "quote": "十步杀一人<br>千里不留形",
                "author": "李白"
            },{
                "quote": "锦瑟无端五十弦<br>一弦一柱思华年",
                "author": "李商隐"
            },{
                "quote": "凤兮凤兮归故乡<br>遨游四海求其凰",
                "author": "司马相如"
            },{
                "quote": "多情只有春庭月<br>犹为离人照落花",
                "author": "张泌"
            },{
                "quote": "我爱你<br>玉儿",
                "author": "小可嗒嗒"
            }],

        /// colors collection
        colors = ["#E0D144", "#E4A629", "#F39040", "#E66751", "#CA83A5", "#A39BCB", "#8EB7BF", "#6DC4A6", "#8AA651"],

        ///random number constructor
        Random  = function Random(max) {
            var prev, next;
            this.max = max;
            this.generate = function generate() {
                while (prev === next)
                    next = Math.floor(Math.random()*this.max);
                prev = next;
                return next;
            }
        },

        composeTweet =  function composeTweet(text) {
            var tweet = {
                url: "https://twitter.com/intent/tweet?",
                via: "via=xiaokedada&",
                hashtags: "hashtags=quotemachine,timi,maoxiaoke&",
                related: "related=@CreativeMarket&",
                text: "text=" + $('.quote-body').html().replace(/<br>|\s/g, '+')
            };
            return window.open(
                tweet.url + tweet.hashtags + tweet.via + tweet.related + tweet.text,
                "Tweet This Quote",
                "resizable,scrollbars,status,width=550px,height=420px"
            );
        },
        randomQuote = new Random(quotes.length),  // Random instance for quote
        randomColor = new Random(colors.length),  // Random instance for colors

        //Main app function

        newQuote = function newQuote(e) {
            var
                quote = quotes[randomQuote.generate()],
                color = colors[randomColor.generate()],

                $page = $('.page'),
                $button = $page.find('.new-quote'),
                $quote = $page.find('.quote'),
                $quoteFooter = $quote.find('.quote-footer'),
                $footerLinks = $('.page-footer a'),

                //
                hasAuthor = !!quote.author;

            //replace the old quote with a new one
            $quote
                .find('.quote-body')
                .html(quote.quote);

            $page.css('background-color', color);
            $button.css('color',color);
            $footerLinks.css('color',color);

            if(hasAuthor){
                $quoteFooter
                    .find('.quote-cite')
                    .text('- ' + quote.author+' -')
                    .end()
                    .show();
            }else {
                $quoteFooter.hide();
            }
        },

        //buttons

        registerHandlers = function registerHandlers() {
            $(document)
                .on('click', '.new-quote', newQuote)
                .on('click', '.button-weibo',composeTweet);
        },

        //initialization using IIFE
        init = function init() {
            registerHandlers();
            newQuote();
        }();



})();
