{{#if title}}
<div class="{{classPrefix}}-title" data-role="title">{{{title}}}</div>
{{/if}}
<div class="{{classPrefix}}-container">
    <div class="{{classPrefix}}-message" data-role="message">{{{message}}}</div>
    {{#if hasFoot}}
    <div class="{{classPrefix}}-operation" data-role="foot">
        {{#if confirmTpl}}
        <div class="{{classPrefix}}-confirm" data-role="confirm">
            {{{confirmTpl}}}
        </div>
        {{/if}}
        {{#if cancelTpl}}
        <div class="{{classPrefix}}-cancel" data-role="cancel">
            {{{cancelTpl}}}
        </div>
        {{/if}}
    </div>
    {{/if}}
</div>
