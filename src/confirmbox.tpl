<div class="ui-xbox">
    <div class="ui-xbox-action">
        {{#if hasCloseX}}<a href="javascript:;" class="ui-xbox-close" data-role="close" title="关闭">×</a>{{/if}}
    </div>
    <div class="ui-xbox-content">
        <div class="ui-confirmXbox">
            {{#if hasTitle}}
            <div class="ui-confirmXbox-title sl-linear-light" data-role="head">
                <h2 data-role="title">{{title}}</h2>
            </div>
            {{/if}}
            <div class="ui-confirmXbox-container">
                <div class="ui-confirmXbox-content" data-role="content">{{content}}</div>
                {{#if hasFoot}}        
                <div class="ui-confirmXbox-operation" data-role="foot">
                    {{#if hasOk}}
                    <div class="ui-button ui-button-sorange ui-confirmXbox-confirm" data-role="confirm">
                        <a href="javascript:;" class="ui-button-text">确定</a>
                    </div>
                    {{/if}}
                    {{#if hasCancel}}
                    <div class="ui-button ui-button-swhite ui-confirmXbox-cancel" data-role="cancel">
                        <a href="javascript:;" class="ui-button-text">取消</a>
                    </div>
                    {{/if}}
                </div>
                {{/if}}
            </div>
        </div>
    </div>
</div>
