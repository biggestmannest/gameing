/**
 * @name Gameing
 * @website https://github.com/biggestmannest/gameing/blob/main/README.md
 * @source https://raw.githubusercontent.com/biggestmannest/gameing/main/Gameing.plugin.js
 * @updateUrl https://raw.githubusercontent.com/biggestmannest/gameing/main/Gameing.plugin.js
 */

module.exports = (() => {
    const config = {
        "info": {
            "name": "Gameing",
            "authors": [ {
                "name": "me, the big man",
                "discord_id": "459815318932553730",
                "github_username": "biggestmannest"
            } ],
            "version": "43.43.43",
            "description": "i am game(ing)",
            "github": "https://github.com/biggestmannest/gameing",
            "github_raw": "https://raw.githubusercontent.com/biggestmannest/gameing/main/Gameing.plugin.js"
        },
        "main": "Gameing.plugin.js"
    };

    return !global.ZeresPluginLibrary ? class {
        constructor() {
            this._config = config;
        }

        getName() {
            return config.info.name;
        }

        getAuthor() {
            return config.info.authors.map(a => a.name).join(", ");
        }

        getDescription() {
            return config.info.description;
        }

        getVersion() {
            return config.info.version;
        }

        load() {
            BdApi.showConfirmationModal("Library Missing", `The library plugin needed for ${config.info.name} is missing. Please click 'Download Now' to install it.`, {
                confirmText: "Download Now",
                cancelText: "Cancel",
                onConfirm: () => {
                    require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
                        if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
                        await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
                    });
                }
            });
        }

        start() { }

        stop() { }

    } : (([ Plugin, { Patcher, DiscordAPI, Settings, PluginUtilities } ]) => {
        const plugin = (Plugin, Api) => class NitroPerks extends Plugin {
            defaultSettings = {
                "screenSharing": true,
                "dev": false,
            };
            settings = PluginUtilities.loadSettings(this.getName(), this.defaultSettings);
            originalNitroStatus = 0;
            screenShareFix;

            getSettingsPanel() {
                return Settings.SettingPanel.build(_ => this.saveAndUpdate(), ...[
                    new Settings.SettingGroup("Features").append(...[
                        new Settings.Switch("High Quality Screensharing", "you can game.", this.settings.screenSharing, value => this.settings.screenSharing = value),
                        new Settings.Switch("Real Developer Mode", "you are hacker", this.settings.dev, value => this.settings.dev = value)
                    ]),
                ]);
            }

            saveAndUpdate() {
                PluginUtilities.saveSettings(this.getName(), this.settings);
                if (this.settings.screenSharing) {
                    BdApi.clearCSS("screenShare");
                } else {
                    switch (this.originalNitroStatus) {
                        case 1:
                            BdApi.injectCSS("screenShare", `#app-mount > div.layerContainer-yqaFcK > div.layer-2KE1M9 > div > div > form > div:nth-child(2) > div > div > div.flex-1xMQg5.flex-1O1GKY.horizontal-1ae9ci.horizontal-2EEEnY.flex-1O1GKY.directionRow-3v3tfG.justifyStart-2NDFzi.alignStretch-DpGPf3.noWrap-3jynv6.modalContent-BM7Qeh > div:nth-child(1) > div > button:nth-child(4) {
                                    display: none;
                                  }`);
                            this.screenShareFix = setInterval(() => {
                                document.querySelector("#app-mount > div.layerContainer-yqaFcK > div.layer-2KE1M9 > div > div > form > div:nth-child(2) > div > div > div.flex-1xMQg5.flex-1O1GKY.horizontal-1ae9ci.horizontal-2EEEnY.flex-1O1GKY.directionRow-3v3tfG.justifyStart-2NDFzi.alignStretch-DpGPf3.noWrap-3jynv6.modalContent-BM7Qeh > div:nth-child(1) > div > button:nth-child(3)").click();
                                clearInterval(this.screenShareFix);
                            }, 100);
                            break;
                        default:
                            BdApi.injectCSS("screenShare", `#app-mount > div.layerContainer-yqaFcK > div.layer-2KE1M9 > div > div > form > div:nth-child(2) > div > div > div.flex-1xMQg5.flex-1O1GKY.horizontal-1ae9ci.horizontal-2EEEnY.flex-1O1GKY.directionRow-3v3tfG.justifyStart-2NDFzi.alignStretch-DpGPf3.noWrap-3jynv6.modalContent-BM7Qeh > div:nth-child(1) > div > button:nth-child(4) {
                                    display: none;
                                  }
                                  #app-mount > div.layerContainer-yqaFcK > div.layer-2KE1M9 > div > div > form > div:nth-child(2) > div > div > div.flex-1xMQg5.flex-1O1GKY.horizontal-1ae9ci.horizontal-2EEEnY.flex-1O1GKY.directionRow-3v3tfG.justifyStart-2NDFzi.alignStretch-DpGPf3.noWrap-3jynv6.modalContent-BM7Qeh > div:nth-child(1) > div > button:nth-child(3) {
                                    display: none;
                                  }
                                  #app-mount > div.layerContainer-yqaFcK > div.layer-2KE1M9 > div > div > form > div:nth-child(2) > div > div > div.flex-1xMQg5.flex-1O1GKY.horizontal-1ae9ci.horizontal-2EEEnY.flex-1O1GKY.directionRow-3v3tfG.justifyStart-2NDFzi.alignStretch-DpGPf3.noWrap-3jynv6.modalContent-BM7Qeh > div:nth-child(2) > div > button:nth-child(3) {
                                    display: none;
                                  }`);
                            this.screenShareFix = setInterval(() => {
                                document.querySelector("#app-mount > div.layerContainer-yqaFcK > div.layer-2KE1M9 > div > div > form > div:nth-child(2) > div > div > div.flex-1xMQg5.flex-1O1GKY.horizontal-1ae9ci.horizontal-2EEEnY.flex-1O1GKY.directionRow-3v3tfG.justifyStart-2NDFzi.alignStretch-DpGPf3.noWrap-3jynv6.modalContent-BM7Qeh > div:nth-child(1) > div > button:nth-child(2)").click();
                                document.querySelector("#app-mount > div.layerContainer-yqaFcK > div.layer-2KE1M9 > div > div > form > div:nth-child(2) > div > div > div.flex-1xMQg5.flex-1O1GKY.horizontal-1ae9ci.horizontal-2EEEnY.flex-1O1GKY.directionRow-3v3tfG.justifyStart-2NDFzi.alignStretch-DpGPf3.noWrap-3jynv6.modalContent-BM7Qeh > div:nth-child(2) > div > button:nth-child(2)").click();
                                clearInterval(this.screenShareFix);
                            }, 100);
                            break;
                    }
                }

                if (this.settings.dev) {
                    t = BdApi.findModuleByProps([ "isDeveloper" ]);
                    Object.defineProperty(t, "isDeveloper", { get: _ => 1, set: _ => _, configurable: true });
                }
            }

            onStart() {
                this.originalNitroStatus = DiscordAPI.currentUser.discordObject.premiumType;
                this.saveAndUpdate();
                DiscordAPI.currentUser.discordObject.premiumType = 2;
            }

            onStop() {
                DiscordAPI.currentUser.discordObject.premiumType = this.originalNitroStatus;
                Patcher.unpatchAll();

                t && Object.defineProperty(t, "isDeveloper", {
                    get: _ => 0,
                    set: _ => {
                        throw new Error("[Gameing PLugin]: Dev shit broke");
                    },
                    configurable: true
                });
            }
        };

        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
