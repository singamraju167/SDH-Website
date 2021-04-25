/* eslint-env node */
/*
 *  This file primarily contains a hotfix for Parcel not properly
 *  working with PostHTML and doing HMR in HTML modules.
 *  Created On 28 November 2020
 */

const chokidar = require('chokidar')
const { closeSync, openSync, utimesSync } = require('fs')

// Hotfix for HMR for posthtml-modules
// https://github.com/parcel-bundler/parcel/issues/3218

const indexFile = 'src/index.html'

chokidar
    .watch(['src/components', 'src/sections', 'src/assets/img'], {
        persistent: true,
    })
    .on('all', async event => {
        if (event == 'change') {
            const touch = path => {
                const time = new Date()
                try {
                    utimesSync(path, time, time)
                } catch (e) {
                    closeSync(openSync(path, 'w'))
                }
            }

            touch(indexFile)
        }
    })
