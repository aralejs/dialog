    {{#if title}}
    <div class="{{classPrefix}}-title" data-role="head">
        <h2 data-role="title">{{title}}</h2>
    </div>
    {{/if}}
    <div class="{{classPrefix}}-container">
        <div class="{{classPrefix}}-message" data-role="message">{{message}}</div>
        {{#if hasFoot}}        
        <div class="{{classPrefix}}-operation" data-role="foot">
            {{#if confirmTpl}}
            <div class="ui-button ui-button-sorange {{classPrefix}}-confirm" data-role="confirm">
                <a href="javascript:;" class="ui-button-text">{{confirmTpl}}</a>
            </div>
            {{/if}}
            {{#if cancelTpl}}
            <div class="ui-button ui-button-swhite {{classPrefix}}-cancel" data-role="cancel">
                <a href="javascript:;" class="ui-button-text">{{cancelTpl}}</a>
            </div>
            {{/if}}
        </div>
        {{/if}}
    </div>
